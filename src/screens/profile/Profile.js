import React, { Component } from 'react';
import Header from '../../common/Header';
import '../../common/Utils';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import './Profile.css';
import { Typography, Button, FormControl, Input, InputLabel, FormHelperText, GridList, Divider } from '@material-ui/core';
import Modal from 'react-modal';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const customStyles = {
    content: {
        width: '60%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: "53px",
        transform: 'translate(-50%, -50%)'
    }
};
const styles = (theme) => ({
    userName: {
        height: "50px",
        paddingTop: "10px",
        paddingLeft: "20px",
        margin: "0.25%"
    },
    fullName: {
        paddingTop: "15px",
        paddingRight: "15px"
    },
    gridList: {
        width: "100%",
        margin: "100px",
        height: "70%"
    },
    large: {
        width: "100px",
        height: "100px",
    },
    gridImages: {
        margin: "0px",
        objectFit: "cover"
    },
    ModalImage:{
        width:"75%",
        objectFit: "cover"
    }
});
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            fullname: "",
            profilefullname: "Pritam Sen",
            fullnameRequired: "displayNone",
            userName:"",
            open: false,
            favClick: false,
            likeCount: 1,
            ImageUrl: "",
            ImageCaption: "",
            userImages: [{}],
            comment:"",
            comments:[],
            commentAdded: false,
            Imageopen: false
        }
    }
    componentWillMount() {
        let xhr = new XMLHttpRequest();
        let that = this;
        let data = null;
        let dataImage = null;
        let xhrImageData = [];
        let token = sessionStorage.getItem("access-token");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let vdata = JSON.parse(this.responseText).data;
                that.setState({ userImages: JSON.parse(this.responseText).data });
                JSON.parse(this.responseText).data.forEach(function (image, index) {
                    xhrImageData[index] = new XMLHttpRequest();
                    xhrImageData[index].open("GET", "https://graph.instagram.com/" + image.id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + token);
                    xhrImageData[index].send(dataImage);
                    xhrImageData[index].onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            vdata[index].media_url = JSON.parse(this.responseText).media_url;
                            vdata[index].timestamp = JSON.parse(this.responseText).timestamp;
                            that.setState({ userImages: vdata });
                        }
                    }
                })
                that.setState({ imageLoaded: true });
            }
        })
        xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + token);
        xhr.send(data);
        let dataUserName = null;
        let xhruserName = new XMLHttpRequest();
        xhruserName.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let userName = JSON.parse(this.responseText).username;
                that.setState({ userName: userName });
            }
        }
        xhruserName.open("GET", "https://graph.instagram.com/me?fields=username&access_token=" + token);
        xhruserName.send(dataUserName);
    }
    closeHandle = () => {
        this.state.open = false;
        this.setState(this.state);
    }
    openHandle = () => {
        this.state.open = true;
        this.setState(this.state);
    }
    imageModalOpen = (image) => {
        this.state.Imageopen = true;
        this.state.ImageUrl = image.media_url;
        this.state.ImageCaption = image.caption;
        this.setState(this.state);
    }
    imageModalClose = () => {
        this.state.Imageopen = false;
        this.setState(this.state);
    }
    updateFullNameHandler = (e) => {
        this.setState({ fullname: e.target.value });
    }
    UpdateClickHandler = () => {
        this.state.fullname === "" ? this.setState({ fullnameRequired: "displayBlock" }) : this.setState({ fullnameRequired: "displayNone" });
        if (this.state.fullname !== "") {
            this.state.profilefullname = this.state.fullname;
            this.state.open = false;
            this.setState(this.state);
        }
    }
    updateFavClickHandler = () => {
        this.setState({ favClick: !this.state.favClick, likeCount: !this.state.favClick ? this.state.likeCount + 1 : this.state.likeCount - 1 })
    }
    addCommentHandler = () => {
        let Addcomments = this.state.comments;
        Addcomments.push(this.state.comment);
        this.setState({ commentAdded: true, comments:Addcomments});
    }
    updateCommentHandler = (e) => {
        this.setState({ comment: e.target.value });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header showSearch={false} showAvatar={true}></Header>
                <div className="info-block">
                    <Avatar alt="profile" src="https://s.gravatar.com/avatar/e75cc3090b759ba08ecc5caf3bbb9e97?s=80"
                        className={classes.large}/>
                    <div>
                        <Typography variant='h5' className={classes.userName} >{this.state.userName}</Typography>
                        <div className="details-block">
                            <Typography variant='body' className="typoG" > Posts:{this.state.userImages.length}</Typography>
                            <Typography variant='body' className="typoG" > Follows:50</Typography>
                            <Typography variant='body' className="typoG" > Followed by:90</Typography>
                        </div>
                        <div className="pname-container" style={{paddingLeft:"25px"}}>
                            <Typography variant="h6" className={classes.fullName} >{this.state.profilefullname}</Typography>
                            <Button variant="fab" color="secondary" onClick={this.openHandle}><EditIcon></EditIcon></Button>
                        </div>
                    </div>
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.open}
                        contentLabel="Edit"
                        onRequestClose={this.closeHandle}
                        style={customStyles}>
                        <div>
                            <Typography variant="h5">Edit</Typography>
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                <Input id="fullname" type="text" fullname={this.state.fullname} onChange={this.updateFullNameHandler}></Input>
                                <FormHelperText className={this.state.fullnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br></br>
                            <br></br>
                            <Button variant="contained" color="primary" onClick={this.UpdateClickHandler} >Update</Button>
                        </div>
                    </Modal>
                </div>
                <div className="gridBlock">
                    <GridList cellHeight={400} cols={4} className={classes.gridList} style={{justifyContent:"center"}}>
                        {this.state.userImages.map(image => (
                            <img alt="insta-images" style={{width:"30%"}} src={image.media_url} className={classes.gridImages} onClick={this.imageModalOpen.bind(this, image)}></img>
                        ))}
                    </GridList>
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.Imageopen}
                        contentLabel="ImageDetail"
                        onRequestClose={this.imageModalClose}
                        style={customStyles}>
                        <div className="image-modalBlock">
                                <img alt="images" style={{width: "50%",float:"left"}} src={this.state.ImageUrl}></img>
                            <div>
                                <div className="image-headerBlock">
                                    <Avatar alt="profileImage" src="https://s.gravatar.com/avatar/e75cc3090b759ba08ecc5caf3bbb9e97?s=80" style={{ padding: "10px", margin: "0px" }} />
                                    <Typography variant='h5' style={{ padding: "10px" }} >Pritam Sen</Typography>
                                </div>
                                <Divider></Divider>
                                <Typography style={{ padding: "10px" }}><b>{this.state.ImageCaption}</b></Typography>
                                {this.state.commentAdded && this.state.comments.map(comment => (
                                    <div>
                                        <span><b>Pritam Sen:</b><span>{this.state.comment}</span></span>
                                    </div>))}
                                <div style={{ paddingTop: "90%", paddingLeft: "5%" }}>
                                    <div className="likeContainer">
                                        {this.state.favClick ? <FavoriteIcon className="likedButton" fontSize="medium" onClick={this.updateFavClickHandler}></FavoriteIcon> : <FavoriteBorderIcon className="likeButton" fontSize="medium" onClick={this.updateFavClickHandler}></FavoriteBorderIcon>}
                                        <span><b>{this.state.likeCount + " Likes"}</b></span>
                                    </div>
                                    <Button variant="contained" className="addButton" color="primary" onClick={this.addCommentHandler} >Add</Button>
                                    <FormControl required className="formControl">
                                        <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                        <Input id="comment" comment={this.state.comment} type="text" onChange={this.updateCommentHandler}></Input>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default (withStyles(styles))(Profile);