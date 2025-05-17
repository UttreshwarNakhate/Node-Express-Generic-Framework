import { EApplicationEnvironment } from './../constant/application.constant'
import { createLogger, format, transports } from 'winston'
import util from 'util'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import envConfig from '../config/env.config'
import path from 'path'
import * as SourceMapSupport from 'source-map-support'

// Linking trace support
SourceMapSupport.install()

// This function is used to print the log in console
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const customLevel = level.toUpperCase()

    const customeTimestamp = timestamp

    const customeMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null
    })

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const cunstomLog = `${customLevel} [${customeTimestamp}] ${customeMessage}\n${'META'} ${customMeta}`
    return cunstomLog
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
