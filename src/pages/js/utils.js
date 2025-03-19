export async function fetchData(file_location, num_data){
    const data = await fetch(file_location)
        .then(response => response.json());

    if (num_data === null){
        return data;
    }

    return data.splice(0, num_data);
}

export function textToHTML(text){
    const parser = new DOMParser();
    return parser.parseFromString(text, 'text/html');
}

