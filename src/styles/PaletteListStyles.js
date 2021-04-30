//Local Responsive Styles Helper
import sizes from './sizes'
// background by SVGBackgrounds.com
import bg from './bg.svg'

export default {
  '@global': {
    'fade-exit': {
      opacity: 1,
    },
    'fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out',
    },
  },
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#527caa',
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */
    overflow: 'scroll',
  },
  container: {
    width: '60%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('lg')]: {
      width: '80%',
    },
    [sizes.down('xs')]: {
      width: '75%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      color: 'white',
    },
  },
  heading: {},
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3,30%)',
    gridGap: '2rem',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2,50%)',
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1,100%)',
      gridGap: '1.4rem',
    },
  },
}
