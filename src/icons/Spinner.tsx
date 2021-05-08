import { css } from 'linaria'

const styles = css`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;

  :after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid #eee5b5;
    border-color: #eee5b5 transparent #eee5b5 transparent;
    border-radius: 50%;
    animation: lds-dual-ring 1.2s linear infinite;
    content: ' ';
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const Spinner = () => <div className={styles} />
