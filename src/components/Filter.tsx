import { useStateMachine } from 'little-state-machine'
import Wrapper from './Wrapper'

const Filter = () => {
    const { state, actions } = useStateMachine({
        clearFilter: (state) => ({
            ...state,
            filter: [],
        }),
    })
    const { filter } = state

    const isFiltering = filter.length > 0

    return isFiltering ? (
        <Wrapper>
            <div className='flex items-center justify-between bg-white p-5 -mt-8 rounded-md shadow-2xl shadow-cyan-primary/25'>
                <div className='flex flex-wrap gap-3'>
                    {filter.map((item) => (
                        <FilterItem key={item.value} type={item.type}>
                            {item.value}
                        </FilterItem>
                    ))}
                </div>
                <button
                    onClick={() => actions.clearFilter()}
                    className='text-cyan-dark hover:text-cyan-primary hover:underline'
                >
                    Clear
                </button>
            </div>
        </Wrapper>
    ) : null
}

export default Filter

interface FilterItemProps {
    children: string
    type: FilterType
}

const FilterItem = ({ children: requirement, type }: FilterItemProps) => {
    const { actions } = useStateMachine({
        removeFilterItem: (state, value: string) => {
            const updatedFilter = state.filter.filter((item) => item.value !== value)

            return {
                ...state,
                filter: updatedFilter,
            }
        },
    })

    return (
        <div className='flex items-center bg-cyan-light-(bg) text-cyan-primary rounded-md overflow-hidden font-bold text-[15px]'>
            <span className='px-2'>{requirement}</span>
            {/* remove filter btn */}
            <button
                onClick={() => actions.removeFilterItem(requirement)}
                title={`remove ${requirement}`}
                className='bg-cyan-primary h-full p-2 hover:bg-cyan-so-dark'
            >
                <img src='/images/icon-remove.svg' />
            </button>
        </div>
    )
}
