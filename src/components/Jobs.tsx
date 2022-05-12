import { useStateMachine } from 'little-state-machine'
import jobs from '../data.json'
import useFilterJobs from '../hooks/useFilterJobs'
import Badge from './Badge'
import Wrapper from './Wrapper'
import cn from 'classnames'

const Jobs = () => {
    const { filteredJobs, isFiltering } = useFilterJobs({ jobs })

    return (
        <Wrapper className='space-y-16 py-14'>
            {(isFiltering ? filteredJobs : jobs).map((job) => (
                <Job key={job.id} job={job} />
            ))}
        </Wrapper>
    )
}

export default Jobs

interface JobProps {
    job: IJob
}

const Job = ({ job }: JobProps) => {
    return (
        <div
            className={cn(
                'bg-white shadow-xl shadow-cyan-primary/25 rounded-md p-5 md:flex md:justify-between md:items-center',
                job.featured && 'border-l-4 border-l-cyan-primary'
            )}
        >
            {/* Top Section */}
            <div className='flex items-center'>
                <img className='hidden md:block mr-6' src={job.logo} alt={job.company} />
                <div>
                    <img className='w-14 h-14 -mt-12 md:hidden' src={job.logo} alt={job.company} />
                    <div className='text-[15px] flex items-center my-2'>
                        <span className='text-cyan-primary font-bold mr-4'>{job.company}</span>
                        <div className='space-x-2'>
                            {job.new && <Badge color='primary'>new!</Badge>}
                            {job.featured && <Badge color='dark'>featured</Badge>}
                        </div>
                    </div>
                    <h2 className='text-cyan-so-dark font-bold text-xl mb-2'>{job.position}</h2>
                    <div className='text-cyan-dark'>
                        {job.postedAt} &middot; {job.contract} &middot; {job.location}
                    </div>
                </div>
            </div>

            <hr className='border-cyan-dark/25 my-4' />

            {/* Bottom Section */}
            <div className='flex gap-4 flex-wrap'>
                <Requirement type='role'>{job.role}</Requirement>
                <Requirement type='level'>{job.level}</Requirement>
                {job.languages.map((lang) => (
                    <Requirement key={lang} type='languages'>
                        {lang}
                    </Requirement>
                ))}
                {job.tools.map((tool) => (
                    <Requirement key={tool} type='tools'>
                        {tool}
                    </Requirement>
                ))}
            </div>
        </div>
    )
}

interface RequirementProps {
    children: string
    type: FilterType
}

const Requirement = ({ children, type }: RequirementProps) => {
    const { actions } = useStateMachine({
        addFilter: (state, item: string) => {
            if (state.filter.find((f) => f.value === item)) return state
            return {
                ...state,
                filter: [...state.filter, { type, value: item }],
            }
        },
    })

    return (
        <button
            onClick={() => actions.addFilter(children)}
            className='bg-cyan-light-(bg) text-cyan-primary hover:bg-cyan-primary hover:text-cyan-light-(bg) px-3 p-1.5 rounded-md font-bold text-[15px]'
        >
            {children}
        </button>
    )
}
