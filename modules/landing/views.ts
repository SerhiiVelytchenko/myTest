import { colors } from '@md-modules/shared/styles/styled/theme';
import styled from 'styled-components';

export const WrapperPages = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const WrapperPage = styled.div<{
  backgroundColorFirst?: keyof typeof colors;
  backgroundColorSecond?: keyof typeof colors;
}>`
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: 4;
  background: linear-gradient(
    45deg,
    ${({ backgroundColorFirst, theme }) => (backgroundColorFirst ? theme.colors[backgroundColorFirst] : '')} 30%,
    ${({ backgroundColorSecond, theme }) => (backgroundColorSecond ? theme.colors[backgroundColorSecond] : '')} 90%
  );
`;

export const Label = styled.div`
  min-width: 180px;
  height: 100px;
  background-repeat: no-repeat;
  z-index: 1;
  @media ${({ theme }) => theme.medias.tablet} {
    height: 40px;
  } ;
`;

export const WrapperText = styled.div<{
  width: string;
  height: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export const Text = styled.h4`
  font-family: Assistant, sans-serif;
  line-height: 1.48;
  padding: 0;
`;

export const Button = styled.button`
  text-transform: capitalize;
  width: 130px;
  height: 35px;
  background: ${({ theme }) => theme.colors.yellow500};
  border-radius: 25px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  outline: none;
  transition: background-color, 2s ease-out, color 1s ease-out;
  cursor: pointer;
  &:hover {
    background: none;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.red650};
  }
`;

export const Picture = styled.div.attrs<{
  transform?: string;
}>(({ transform }) => ({
  style: {
    transform: transform
  }
}))<{
  transform?: string;
}>`
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1;
`;

export const WrapperGrid = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

export const Planet = styled.div<{
  transform: number;
  transition?: string;
}>`
  background: url('https://cultum.io/static/images/planet.svg') no-repeat;
  transform: rotate(${({ transform }) => -transform + 360}deg);
  transition: 1s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
`;

export const ButtonArrow = styled.button`
  border: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: left;
  background-size: 50px;
  position: absolute;
  cursor: pointer;
  z-index: 10;
  height: 20px;
  padding-left: 60px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.yellow500};
`;

export const Quotes = styled.div`
  background-repeat: no-repeat;
  background-size: 10px;
  height: 10px;
`;
