import React, { Component } from 'react';
import './Header.css';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const styles = theme => ({
    searchIcon: {
        fill: "black"
    },
    searchCardContentStyle: {
        width: "280px",
        heigth:"50px",
        borderRadius: "3px",
        backgroundColor: "grey",
        padding: "0px"
    },
    searchInput: {
        fontSize: "medium"    }
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorRef: null,
            showSearch: this.props.showSearch,
            showAvatar: this.props.showAvatar,
        };
    }
    handleClick = (event) => {
        this.setState({ anchorRef: event.target });
    }
    handleClose = () => {
        this.setState({ anchorRef: null });
    };
    logoutHandler = () =>{
        sessionStorage.clear();
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <header className="pageHeader">
                  {this.state.showSearch ?<span className="side-logo">Image Viewer</span>: <Link to="/home" style={{textDecoration: "none", paddingLeft:"inherit"}}><span style={{color:"white"}}>Image Viewer</span></Link>}
                <div className="topRightHeaderBlock">
                        {this.state.showSearch && <Card className="searchBar">
                            <CardContent className={classes.searchCardContentStyle}>
                                <div className="searchMask">
                                    <SearchIcon className={classes.searchIcon} fontSize="large"></SearchIcon>
                                    <Input className={classes.searchInput} placeholder="Search..." onChange={this.props.searchSpace}></Input>
                                </div>
                            </CardContent>
                        </Card>
                        }
                        {this.state.showAvatar &&
                            <IconButton onClick={this.handleClick}><Avatar alt="OnePiece" src="https://s.gravatar.com/avatar/e75cc3090b759ba08ecc5caf3bbb9e97?s=80" /></IconButton>
                        }
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorRef}
                            keepMounted
                            open={Boolean(this.state.anchorRef)}
                            onClose={this.handleClose}
                            PaperProps={{
                                style: {
                                    marginTop: "25px",
                                    backgroundColor: '#c0c0c0',
                                }
                            }}>
                            {this.state.showSearch && 
                            <div style={{padding:"0px"}}>
                            <Link to="/profile" style={{textDecoration: "none"}}> 
                            <MenuItem style={{ backgroundColor: '#c0c0c0'}}>
                            <b>My Account</b>
                            </MenuItem>
                            </Link>
                             </div>
                            }
                            {this.state.showSearch && 
                                <Divider />
                            }
                            <Link to="/" style={{textDecoration: "none"}}> 
                            <MenuItem style={{ backgroundColor: '#c0c0c0' }} onClick={this.logoutHandler} >
                                <b>Logout</b>
                            </MenuItem>
                            </Link>
                        </Menu>
                    </div>
                </header>
            </div>
        )
    }
}
export default (withStyles(styles))(Header);