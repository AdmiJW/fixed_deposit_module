// The template that will be used for all API fetching methods
async function fetchTemplate({
    onInit = () => {},
    onSuccess = () => {}, 
    onFailure = () => {}, 
    onFinal = () => {},
    url,
    body = undefined
}) {
    onInit();
    try {
        const res = await fetch(url, {
            ...body,
            credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw data;
        onSuccess(data);
    } 
    catch (e) { onFailure(e); }
    finally { onFinal(); }
}

export default fetchTemplate;