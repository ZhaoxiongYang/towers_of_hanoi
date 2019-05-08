import React, {Component}from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import GameDescription from './GameDescription';
import Disks from './Disks';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {

    position: 'relative',
    height: 1000,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 50,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: 'https://www.pngkit.com/png/detail/193-1938084_pichu-switch-super-smash-bros-ultimate-pichu.png',
    title: 'EASY',
    disknum: 3,
    width: '33.3%',
  },
  {
    url: 'https://pbs.twimg.com/media/CnpVgMfVYAA9k7Z.jpg',
    title: 'MEDIUM',
    disknum: 4,
    width: '33.3%',
  },
  {
    url: 'https://www.nicepng.com/png/detail/441-4418524_alolan-raichu-png-raichu-alola-pokemon-png.png',
    title: 'HARD',
    disknum: 5,
    width: '33.3%',
  },
];

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      inGame : false,
      disknum : 0
    };
  }
  render(){
    const {classes} = this.props;

    return (this.state.inGame && this.state.disknum > 0 )? this.getInGameHome(this.state.disknum): this.getNotInGameHome(classes);
    }

  resetDifficulty = () => {
    this.setState({ 
      inGame: false,
      disknum: 0,
     });
  }

  handleClick = (event, disknum) => {
    this.setState({ 
      inGame: true,
      disknum: disknum,
     });
  }

  getInGameHome = (level) => {
    return(
      <Disks level = {level} resetDifficulty={this.resetDifficulty}/>
      );
  }

  getNotInGameHome = (classes)=>{
    return (<div>
      <GameDescription />
      <div className={classes.root}>
        {images.map(image => (
          <ButtonBase
            onClick={(e)=>this.handleClick(e, image.disknum)}
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </div>
    </div>);
  } 
}


export default withStyles(styles)(Home);