const Tags = () => {
    const {data,loading,error} = useFetch("http://localhost:3000/api/teachers");
    return(
        <>
            {data.map((dpto,index) => { 
                return(
                <option key={index} value={dpto._id}>
                {dpto.first_name +" "+dpto.last_name}
                </option>
                )
            })}
        </>
        
    );
}