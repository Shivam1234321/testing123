const Table = ({data}) =>{
    let count = 1;
    const getRow = (item) =>{
        return(
            <tr key={`count`+count+``}>
                {
                    Object.keys(data?.rowName).map((key, index) => (
                       <td key={key+index}>{ key === 'sn' ? count++ : (key === 'name' ? item[key] : item[key])  }</td>
                    ))
                }
            </tr>
        )
    }

  return(
    <>
        <table border="1" cellPadding="10">
        <thead>
          <tr>
            {/* Dynamically render table headers based on the keys of the first item in the array */}
            {data?.cols > 0 && Object.values(data?.rowName).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {
                data?.Exchange?.length > 0 ?  data?.Exchange.map((item, index)=>{
                    return getRow(item);
                }) : <tr><td colSpan={data?.cols}>Sorry, Exchange not found.</td></tr>
            }
        </tbody>

        </table>
    </>
  )
}

export default Table;