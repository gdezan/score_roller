import { keyframes } from "styled-components";

export const ripple = keyframes`
0% {
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(25, 25);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}
`;

export const GridAnim = keyframes`
  0% {
    transform: scale(1);
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.75);
  }
  30% {
    transform: scale(1.05);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
  }
  100% {
    transform: scale(1.05) translateY(-20px);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
  }
`;

export const PbeRowAnim = keyframes`
0% {
  transform: translateY(-80px) scale(0.95);
}
30% {
  transform: translateY(-80px) scale(1);
}
50% {
  transform: translateY(-80px) scale(1);
}
100% {
  transform: translateY(-30px) scale(1);
}
`;
