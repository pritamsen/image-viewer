import React, { Component } from 'react';
import Header from '../../common/Header';
import './Home.css';
import '../../common/Utils';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Button, Input, InputLabel, FormControl } from '@material-ui/core';

const styles = theme => ({
    PostHeaderStyle: {
        display: "flex",
        justifyContent: "space-around",
        padding: "10px"
    },
    PostContentStyle: {
        padding: "0px",
        left: "50%",
        marginRight: "-22%"
    }
});

class Home extends Component {
    constructor() {
        super();
        this.state = {
            favClick: false,
            likeCount: 1,
            commentAdded: false,
            comment: "",
            comments: [{}],
            imageData: [{}],
            userImages: [{}],
            imageLoaded: false,
            userName:"",
            search: null,
        }
    }
    componentWillMount() {
        let data = null;
        let dataImage = null;
        let xhr = new XMLHttpRequest();
        let that = this;
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
    searchMask = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }
    favClickHandler = () => {
        this.setState({ favClick: !this.state.favClick, likeCount: !this.state.favClick ? this.state.likeCount + 1 : this.state.likeCount - 1 })
    }
    inputCommentHandler = (e) => {
        this.setState({ comment: e.target.value });
    }
    commentAddHandler = (id) => {
        let Vcomments = this.state.comments;
       let  Icomments = {
            com :this.state.comment,
            imageId : id.id
        }
        Vcomments.push(Icomments);
        this.setState({ commentAdded: true, comments: Vcomments});
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header showSearch={true} showAvatar={true} searchMask={this.searchMask}></Header>
                <div className="imageBlock">
                    {this.state.userImages.filter((image) => {
                         {
                            return image;
                        }
                    }).map(image => (
                        <Card className="postcardBlock" key={"image-" + image.id}>
                        <CardHeader
                            avatar={<Avatar alt="Profile" src="https://s.gravatar.com/avatar/e75cc3090b759ba08ecc5caf3bbb9e97?s=80" />}
                            title={<b>{this.state.userName}</b>}
                            subheader={new Date(image.timestamp).toLocaleDateString() + " " + new Date(image.timestamp).toLocaleTimeString()}
                            className={classes.postHeaderStyle}
                            titleTypographyProps={{ component: "span", float: "left" }}>
                        </CardHeader>
                        <CardContent className={classes.postContentStyle}>
                            {this.state.imageLoaded && <img alt="insta-images" src={image.media_url}></img>}
                            <hr></hr>
                            <Typography>
                                {image.caption}
                            </Typography>
                            <br></br>
                            <div className="like-container">
                                {this.state.favClick ? <FavoriteIcon className="likedButton" fontSize="medium" onClick={this.favClickHandler}></FavoriteIcon> : <FavoriteBorderIcon className="likeButton" fontSize="medium" onClick={this.favClickHandler}></FavoriteBorderIcon>}
                                <span><b>{this.state.likeCount + " Likes"}</b></span>
                            </div>
                            <br></br>

                            {this.state.commentAdded && this.state.comments.map(comment => (
                                comment.imageId == image.id ?
                                <div>
                                    <span><b>Pritam Sen:</b><span>{comment.com}</span></span>
                                </div>: ""
                            ))
                            }
                            <Button variant="contained" className="addButton" color="primary" onClick={this.commentAddHandler.bind(this,image)} >Add</Button>
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                <Input id="comment" comment={this.state.comment} type="text" style={{ width: "271px" }} onChange={this.inputCommentHandler}></Input>
                            </FormControl>
                        </CardContent>
                    </Card>))
                    }
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Home);