function Die (props){
    const styles = {
        background: props.value.isHeld ? "#59E391" : "white",
        boxShadow: props.value.isHeld ? "0px 0px 6px 4px rgba(0,0,0,0.75)" : "1px 1px 0px -200px rgba(0,0,0,0.75)"
    }
    return(
        <div className="die-face" onClick={props.holdDie} style={styles} >
            <img src={`/${props.value.value}.jpg`} alt="" style={{filter: props.value.isHeld ? "blur(1px)" : "none"}} />
        </div>
    )
}

export default Die