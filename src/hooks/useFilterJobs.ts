import { useStateMachine } from 'little-state-machine'

const useFilterJobs = ({ jobs }: { jobs: IJob[] }) => {
    const { state } = useStateMachine()
    const { filter } = state

    // filter job based from filter array state
    // conditions are set to true if type is not exist in filter array
    // just to make it to be ignored by final comparison
    // if type is exist, compare it to the real job
    const filteredJobs = jobs.filter((job) => {
        let isRoleMatch = true
        const role = filter.find((item) => item.type == 'role')?.value
        if (role) {
            isRoleMatch = job.role === role
        }

        let isLevelMatch = true
        const level = filter.find((item) => item.type == 'level')?.value
        if (level) {
            isLevelMatch = job.level === level
        }

        let isLanguagesIncluded = true
        const languages = filter
            .filter((item) => item.type == 'languages')
            .map((item) => item.value)
        if (languages.length > 0) {
            isLanguagesIncluded = languages.every((lang) => {
                return job.languages.includes(lang)
            })
        }

        let isToolsIncluded = true
        const tools = filter.filter((item) => item.type == 'tools').map((item) => item.value)
        if (tools.length > 0) {
            isToolsIncluded = tools.every((tool) => {
                return job.tools.includes(tool)
            })
        }

        return isRoleMatch && isLevelMatch && isLanguagesIncluded && isToolsIncluded
    })

    const isFiltering = filter.length > 0

    return { filteredJobs, isFiltering }
}

export default useFilterJobs
