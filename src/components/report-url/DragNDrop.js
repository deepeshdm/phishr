import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiUploadCloudLine } from 'react-icons/ri';

function FileInput({ onFileSelect }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const isTxtFile = file.name.endsWith('.txt');

                if (isTxtFile) {
                    onFileSelect(file);
                } else {
                    console.error('Invalid file format. Please select a .txt file.');
                }
            }
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: '.txt', // Accept only .txt files
    });

    return (
        <div
            {...getRootProps()}
            className={`dropzone p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input {...getInputProps()} className="hidden" />
            <RiUploadCloudLine size={48} className={`text-${isHovered ? 'blue' : 'gray'}-500 mb-2`} />
            <p className={`text-${isHovered ? 'blue' : 'gray'}-500 text-sm font-bold transition-colors duration-300`}>
                {isDragActive ? 'Drop the file here...' : 'Drag and drop a text file here, or click to select a file'}
            </p>
        </div>
    );
}

const DragNDrop = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = async (file) => {
        console.log('Selected file:', file);

        try {
            const text = await file.text();
            console.log('File contents:', text);
            setSelectedFile(file);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    return (
        <div className="flex flex-col mx-[30%] mt-5 gap-y-1">
            <p className="text-base ml-14">Upload (or drop) a .txt file of URLs here (Max 1000 URLs)</p>
            <FileInput onFileSelect={handleFileSelect} />
            {selectedFile && (
                <p className="text-sm font-semibold mt-2">
                    Selected file : {selectedFile.name}
                </p>
            )}
        </div>
    );
};

export default DragNDrop;
