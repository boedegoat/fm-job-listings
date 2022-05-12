import cn from 'classnames'

interface Props
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactNode
}

const Wrapper = ({ className, children, ...props }: Props) => {
    return (
        <div {...props} className={cn('container mx-auto px-5', className)}>
            {children}
        </div>
    )
}

export default Wrapper
