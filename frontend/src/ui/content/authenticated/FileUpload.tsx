import { CloudUpload } from '@mui/icons-material';
import { Button, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import './FileUpload.scss';

// TODO add API and adjust UI
const FileUpload: React.FC = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<string[]>([]);

    const onFilesChange = (files: FileList) => {
        if (fileInput.current) {
            const fileNames = [];
            for (let i = 0; i < files.length; i++) {
                fileNames.push(files[i].name);
            }

            setFiles(fileNames);

            fileInput.current.files = files;
        }
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onFilesChange(event.dataTransfer.files);
    };

    const onCloudButtonClick = () => {
        fileInput.current?.click();
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //const formData = new FormData(event.currentTarget);
        //formData.getAll('files');
        // TODO POST
    };

    return (
        <div className="file-upload">
            <form onSubmit={onSubmit}>
                <div>
                    <Typography>Upload</Typography>
                </div>
                <div className="file-upload__drop_area" onDrop={onDrop} onDragOver={onDragOver}>
                    <input
                        ref={fileInput}
                        name="files"
                        type="file"
                        multiple={true}
                        onChange={(input) => input.currentTarget.files && onFilesChange(input.currentTarget.files)}
                        style={{ display: 'none' }}
                    />
                    <div className="drop-area__message">
                        <Typography>Drag and drop a file here or click</Typography>
                        <IconButton onClick={onCloudButtonClick}>
                            <CloudUpload />
                        </IconButton>
                    </div>
                </div>
                <div className="file-upload__button_area">
                    <Button type="submit" variant="contained">
                        SUBMIT
                    </Button>
                </div>
            </form>
            <div>
                <List>
                    {files.map((fileName) => (
                        <ListItem key={fileName}>
                            <Typography>{fileName}</Typography>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default FileUpload;
