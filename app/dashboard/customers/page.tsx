import Table from '@/app/ui/customers/table'

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>
}) {
    const searchParams = await props.searchParams; // Use 'await' to parse 'props' data
    const query = searchParams?.query || '';
    return(
        <>
            <div>
                <Table query={query} />
            </div>
        </>

    )
}