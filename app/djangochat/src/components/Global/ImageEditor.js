import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

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
        return (
            <div>
                <p>Hello</p>
                <Dropzone
                    onDrop={this.handleDrop}
                    onClick={e=>e.preventDefault()}
                    disableClick
                    style={{ width: '200px', height: '200px' }}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} onClick={e=>e.preventDefault()} />
                            <AvatarEditor ref={this.refEditor} width={200} height={200} borderRadius={this.state.empty?40:100} image={this.state.image} />
                        </div>
                    )}
                </Dropzone>
                {/* FIXME: Scale not working */}
                <input type="range" min="0.5" max="100" defaultValue={this.state.scale} onChange={this.changeScale} className="slider" id="Scale"></input>
                {/* <input type="file" text="Select an image"/> */}
            </div>
        )
    }
    
}

export default ImageEditor