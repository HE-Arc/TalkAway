import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import './ImageEditor.css';

class ImageEditor extends Component {

    constructor(props){
        super(props);
        this.refEditor = React.createRef();
        this.dropzoneRef = React.createRef()

        this.state = this.initialState();
    }

    initialState = () => {
        return{
            id: this.props.id,
            image: this.props.image === '' ? require('./image/drop.png') : this.props.image,
            scale: 1,
            empty: this.props.image === ''
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.id !== prevProps.id){
            this.setState(this.initialState());
        }
    }

    handleDrop = dropped => {
        this.setState({
            image: dropped[0],
            empty: false
        })
    }
    
    changeScale = (e) => {
        this.setState({scale:e.target.value})
    }

    getData = () => {
        if(this.state.empty)
            return '';
        return this.refEditor.current.getImageScaledToCanvas().toDataURL();
    }

    render() {
        const scale = !this.state.empty ? <input className="sliderEditor slider" type="range" step='0.01' min='0.1' max='3' defaultValue={this.state.scale} onChange={this.changeScale} id="Scale"></input> : '';
        return (
            <div className="imageEditorContainer">
                <Dropzone className="dropzone"
                    onDrop={this.handleDrop}
                    onClick={e=>e.preventDefault()}
                    disableClick >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} onClick={e=>e.preventDefault()} />
                            <AvatarEditor className="avatarEditor" ref={this.refEditor} width={100} height={100} scale={Number(this.state.scale)} borderRadius={this.state.empty?40:100} image={this.state.image} />
                        </div>
                    )}
                </Dropzone>
                {scale}
            </div>
        )
    }
    
}

export default ImageEditor