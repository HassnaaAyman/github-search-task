import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 30px;
width: 90%;
align-items: center;
margin: 50px auto;
`;

export const Input = styled.input`
padding-left: 41px;
background: url('https://img.icons8.com/ios-glyphs/30/000000/search--v1.png')
  no-repeat left;
background-size: 20px;
width: 23%;
height: 40px;
border: 1px solid #cccc;
background-position-x: 10px;
margin-top: 30px;
text-align: start;
`;

export const ListingContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
padding: 10px;
margin-top: 20px;
`;

export const RepoCard = styled.div`
width: 400px;
display: flex;
flex-direction: column;
padding: 10px;
background-color: white;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
transition: 0.3s;
margin-bottom: 20px;
position: relative;
min-height: 150px;
`;

export const RepoName = styled.h3`
color: black;
font-weight: bold;
margin: 0px;
`;

export const RepoDescription = styled.p`
color: rgba(52, 66, 71, 0.38);
font-size: 14px;
`;

export const IconsWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 30%;
position: absolute;
bottom: 16px;
`;

export const NumbersText = styled.h4`
text-align: center;
color: black;
font-weight: bold;
margin: 0px;
`;

export const NumbersWithIconsWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: end;
`;

export const SelectInputs = styled.select`
width: 23%;
height: 40px;
border: 1px solid #cccc;
margin-right: 10px;
`;

export const SelectInputsWrapper = styled.div`
display: flex;
flex-direction: row;
margin-top: 20px;
width: 100%;
justify-content: flex-start;
`;
