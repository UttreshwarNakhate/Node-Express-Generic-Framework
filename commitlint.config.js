module.exports = {
<<<<<<< HEAD
    extends: ['@commitlint/config-conventional'],
=======
    extends: ["@commitlint/config-conventional"],
>>>>>>> b9bebdb683e7d82818ba44e3cefe49c0b9e48d3d
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']],
        'subject-case': [2, 'always', 'sentence-case']
    }
}
