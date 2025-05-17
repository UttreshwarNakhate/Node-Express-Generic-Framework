import { EApplicationEnvironment } from './../constant/application.constant'
import { createLogger, format, transports } from 'winston'
import util from 'util'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import envConfig from '../config/env.config'
import path from 'path'
import * as SourceMapSupport from 'source-map-support'
import { blue, bold, green, magenta, red, yellow } from 'colorette'

// Linking trace support
SourceMapSupport.install()

// Following function is used to show date and time with 12 hours format
const getFormattedTimestamp = (): string => {
    const now = new Date()
    const pad = (n: number) => n.toString().padStart(2, '0')

    let hours = now.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours === 0 ? 12 : hours

    return (
        `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
        `${pad(hours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`
    )
}

// This function is used to print the log in console
const consoleLogFormat = format.printf((info) => {
    const { level, message, meta = {} } = info

    const customLevel = level.toUpperCase()

    const customeTimestamp = green(getFormattedTimestamp())

    const customeMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const cunstomLog = `[ ${customLevel} | [${customeTimestamp}] | ${customeMessage} | [${magenta('META: ')}  ${customMeta}] ]`

    // Apply full line color based on level
    let cunstomColoredLog: string
    switch (customLevel) {
        case 'ERROR':
            cunstomColoredLog = red(bold(cunstomLog))
            break
        case 'INFO':
            cunstomColoredLog = blue(bold(cunstomLog))
            break
        case 'WARN':
            cunstomColoredLog = yellow(bold(cunstomLog))
            break
        default:
            cunstomColoredLog = bold(cunstomLog)
    }

    return cunstomColoredLog
})

// This transport is used to console the info, error, warning
const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (envConfig.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}

// This function is used to rint the logs in logs file
const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const logMeta: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }
    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    }
    return JSON.stringify(logData, null, 4)
})

// This transport is used to create the error and info logs files to root directory
const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${envConfig.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport(), ...consoleTransport()]
})
