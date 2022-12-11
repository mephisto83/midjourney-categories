import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageSources from './image_sources';
import { captureParameterValues } from './util';

function useImageIndex(images: string[], index: number): [number, { key: string, time: number }] {
    const [imageIndex, setImageIndex] = useState(index);
    const [overrideLetter, setOverrideLetter] = useState({ key: '', time: 0 });
    const [value, setValue] = useState(Date.now());
    React.useEffect(() => {

        document.addEventListener('keyup', handleKeyPress)

        return () => {
            document.removeEventListener('keyup', handleKeyPress)
        }
    }, []); // <---- Add this deps array
    console.log(`imageIndex: ${imageIndex}`)
    return [imageIndex, overrideLetter];
    function handleKeyPress(e: any) {
        var key = e.key;
        if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.indexOf(`${key}`.toUpperCase()) !== -1) {
            setOverrideLetter({ key, time: Date.now() });
        }
        else {
            console.log(`key pressed ${key}`)
            switch (key) {
                case 'Enter':
                    setOverrideLetter({ key, time: Date.now() });
                    break;
                case 'ArrowDown':
                case 'ArrowLeft': {
                    setImageIndex(-Date.now())
                }
                    break;
                case 'ArrowRight':
                case 'ArrowUp': {
                    setImageIndex(Date.now());
                }
                    break;
            }
            setValue(Date.now());
        }
    }
}

export default function Component(props: any) {
    const images = ImageSources();
    const [imageIndex, overrideLetter] = useImageIndex(images, 0);
    const [imageSrc, setImageSrc] = useState('');
    const [letter, setLetter] = useState('');
    const [replaceLetter, setReplaceLetter] = useState('');
    const [index, setIndex] = useState(0);
    const [color, setColor] = useState('');
    const [artist, setArtist] = useState('');

    useEffect(() => {
        let step = 1;
        if (imageIndex < 0) {
            step = -1;
        }
        let next = index + step;
        if (next < 0) {
            next = images.length - 1;
        }
        else if (next > images.length - 1) {
            next = images.length + 1;
        }
        setIndex(next)
        if (images[next]) {
            setImageSrc(images[next])
            const { letter, color, artist } = captureParameterValues(images[next])
            setLetter(letter || '')
            setColor(color || '')
            setArtist(artist || '')
        }
    }, [imageIndex]);
    useEffect(() => {
        if (overrideLetter.key === 'Enter') {
            localStorage.setItem(imageSrc, JSON.stringify({
                imageSrc,
                color,
                artist,
                letter: replaceLetter || letter
            }))
            setReplaceLetter('');
        }
        else {
            setReplaceLetter(`${overrideLetter?.key || ''}`)
        }
    }, [overrideLetter?.key, overrideLetter?.time])

    return (
        <header className="App-header">
            <img src={imageSrc || logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <div>Letter : {replaceLetter || letter}</div>
            <div>Color : {color}</div>
            <div>Artist : {artist}</div>
            <div>  : {imageSrc}</div>
            <button onClick={() => {
                let result: any[] = [];
                images.forEach((t) => {
                    let details = localStorage.getItem(t);
                    if (details) {
                        let d = JSON.parse(details);
                        result.push(d);
                    }
                });
                console.log(JSON.stringify(result));
            }}>build</button>
        </header>
    );
}
