const apiRequest = async (url = '',optionObj = null, errMsg = null ) => {



    try{
        const rersponse = await fetch(url,optionObj)
        if(!rersponse.ok)throw Error ("Please Reload the page")

    }
    catch(err){
        errMsg = err.Message;

    }
    finally{
        return errMsg

    }
}

export default apiRequest