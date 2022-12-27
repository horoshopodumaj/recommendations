import React from "react";

class ImagePreview extends React.PureComponent {
    static get PREVIEW_HEIGHT() {
        return 60;
    }

    setCanvasRef = (node) => {
        this.canvasRef = node;
    };

    componentDidMount() {
        const {
            canvasRef,
            props: { file },
        } = this;

        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            const { naturalWidth, naturalHeight } = image;
            const ratio = naturalWidth / naturalHeight;
            const width = Math.ceil(ratio * ImagePreview.PREVIEW_HEIGHT);
            canvasRef.width = width;
            const ctx = canvasRef.getContext("2d");
            ctx.drawImage(
                image,
                0,
                0,
                naturalWidth,
                naturalHeight,
                0,
                0,
                width,
                ImagePreview.PREVIEW_HEIGHT
            );
            URL.revokeObjectURL(image.src);
        };
    }

    render() {
        const { setCanvasRef } = this;

        return (
            <canvas
                className="ImagePreview"
                ref={setCanvasRef}
                width={ImagePreview.PREVIEW_HEIGHT}
                height={ImagePreview.PREVIEW_HEIGHT}
            />
        );
    }
}

class FilePicker extends React.Component {
    state = {
        fileList: [],
    };

    addFiles = (files) => {
        this.setState({
            fileList: files,
        });
    };

    onFilesChange = (event) => this.addFiles(event.target.files[0]);

    onDropFiles = (event) => {
        event.preventDefault();
        this.addFiles([...event.dataTransfer.files]);
    };

    onDragOver(event) {
        event.preventDefault();
    }

    onDeleteFile = (index) => {
        const { fileList } = this.state;
        const items = fileList.slice();
        items.splice(index, 1);
        this.setState({ fileList: items });
    };

    renderItem = (file, index) => {
        const { onDeleteFile } = this;
        const key = file.name + file.lastModified;
        return (
            <li className="FileList-Item" key={key}>
                <ImagePreview file={file} />
                <button
                    className="FileList-Delete"
                    type="button"
                    onClick={() => onDeleteFile(index)}
                />
            </li>
        );
    };

    render() {
        const {
            state: { fileList },
            onFilesChange,
            onDropFiles,
            onDragOver,
            renderItem,
        } = this;

        return (
            <div className="FilePicker" onDragOver={onDragOver} onDrop={onDropFiles}>
                <label className="FilePicker-add AddButton">
                    <input
                        className="AddButton-Input"
                        type="file"
                        onChange={onFilesChange}
                        multiple
                        accept="image/*"
                    />
                </label>
                {fileList && fileList.length > 0 && (
                    <ul className="FileList">{fileList.map(renderItem)}</ul>
                )}
            </div>
        );
    }
}

export default FilePicker;
