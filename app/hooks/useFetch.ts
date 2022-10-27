import { RequestError, SuccessfulRequest } from 'http/response_normalizer';
import React from 'react';

export default function useFetch(
    url: string,
    options = { fetchOnMount: true }) {
    const [data, setData] = React.useState<SuccessfulRequest | null>(null);
    const [error, setError] = React.useState<RequestError | null>(null);

    const get = React.useCallback(async () => {
        const response = await fetch(url);
        const json = await response.json();
        if (response.ok) {
            setData(json);
        } else {
            setError(json);
        }
        return json;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (options.fetchOnMount) get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        data,
        error,
        get
    };
}