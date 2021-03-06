import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';

import DefaultImage from '~/assets/meetup.png';
import { Container } from './styles';
import api from '~/services/api';

export default function MeetupInput() {
    const { defaultValue, registerField } = useField('banner');

    const [file, setFile] = useState(defaultValue && defaultValue.id);
    const [preview, setPreview] = useState(defaultValue && defaultValue.url);

    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            registerField({
                name: 'banner_id',
                ref: ref.current,
                path: 'dataset.file',
            });
        }
    }, [ref.current]); //eslint-disable-line

    async function handleChange(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);

        const response = await api.post('files', data);

        const { id, url } = response.data;

        setFile(id);
        setPreview(url);
    }

    return (
        <Container>
            <label htmlFor="banner">
                <img src={preview || DefaultImage} alt="banner" />

                <input
                    type="file"
                    id="banner"
                    accept="image/*"
                    data-file={file}
                    onChange={handleChange}
                    ref={ref}
                />
            </label>
        </Container>
    );
}
