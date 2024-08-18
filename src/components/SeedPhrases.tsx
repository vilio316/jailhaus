export type seedStyle = {
    phrase: string,
    service: string,
}

export default function Seeds(props : any){
    let optimus: any[] = props.array 
    return(
        <>
            <div id="seed_phrases">
                <h2>Seed Phrases</h2>
                {optimus.map((item : any[]) => (
                    item.map((seedVal : seedStyle) => (
                        <div key={seedVal.service}>
                            <p style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                            }}>{seedVal.service}</p>
                            <p>{seedVal.phrase}</p>
                        </div>
                    ))
                ))}
            </div>
        </>
    )
}