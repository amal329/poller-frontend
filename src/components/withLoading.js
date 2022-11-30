import React from "react";
import { CircularProgress } from "@mui/material";

const withLoading = (WrappedComponent) => ({...props}) => {
    if(props.data.isLoading){
        return <div className="center">
            <CircularProgress color="success" />
        </div>
    }
    else{
        return <WrappedComponent {...props}/>
    }
}

export default withLoading;