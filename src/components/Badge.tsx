import cn from 'classnames'

interface Props {
    children: React.ReactNode
    color?: 'primary' | 'dark'
}

const Badge = ({ children, color: colorProps = 'dark' }: Props) => {
    const color = {
        primary: 'bg-cyan-primary text-white',
        dark: 'bg-cyan-so-dark text-white',
    }

    return (
        <span className={cn('uppercase px-2 py-1.5 rounded-full', color[colorProps])}>
            <span className='text-sm leading-[1]'>{children}</span>
        </span>
    )
}

export default Badge
