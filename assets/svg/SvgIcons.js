import React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  Circle,
  Line,
  Polyline,
  Rect,
  ClipPath,
  Ellipse,
  Stop,
  Mask,
  Use,
  Image,
  Pattern,
  LinearGradient,
  Text,
  TSpan,
} from 'react-native-svg';
import { ThemeColors } from '../../src/utils/Theme';

const RightArrowIcon = ({ ...props }) => {

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="35" viewBox="0 0 16 35">
      <Text id="_" data-name="&lt;" transform="translate(0 26)" fill="#fff" font-size="25" font-family="Poppins-Medium, Poppins" font-weight="500"><TSpan x="0" y="0">&lt;</TSpan></Text>
    </Svg>
  );
};

const AddCircleIcon = ({ ...props }) => {

  return (
    <Svg id="Group_5025" data-name="Group 5025" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
      <G id="Group_5022" data-name="Group 5022">
        <G id="Group_5021" data-name="Group 5021">
          <Path id="Path_22" data-name="Path 22" d="M35,0A35,35,0,1,0,70,35,35.038,35.038,0,0,0,35,0Zm0,64.578A29.578,29.578,0,1,1,64.578,35,29.612,29.612,0,0,1,35,64.578Z" fill="#fff" />
        </G>
      </G>
      <G id="Group_5024" data-name="Group 5024" transform="translate(18.733 18.49)">
        <G id="Group_5023" data-name="Group 5023">
          <Path id="Path_23" data-name="Path 23" d="M166.844,148.793H156V137.949a2.711,2.711,0,0,0-5.422,0v10.844H139.733a2.711,2.711,0,1,0,0,5.422h10.844V165.06a2.711,2.711,0,0,0,5.422,0V154.216h10.844a2.711,2.711,0,0,0,0-5.422Z" transform="translate(-137.022 -135.238)" fill="#fff" />
        </G>
      </G>
    </Svg>
  );
};

const ArrowDownIcon = ({ ...props }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9">
      <Path id="Polygon_2" data-name="Polygon 2" d="M4.126,1.573a1,1,0,0,1,1.748,0l3.3,5.941A1,1,0,0,1,8.3,9H1.7A1,1,0,0,1,.825,7.514Z" transform="translate(10 9) rotate(180)" fill="#fff" />
    </Svg>
  );
};

const ArrowUpIcon = ({ ...props }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9">
      <Path id="Polygon_1" data-name="Polygon 1" d="M4.126,1.573a1,1,0,0,1,1.748,0l3.3,5.941A1,1,0,0,1,8.3,9H1.7A1,1,0,0,1,.825,7.514Z" fill="#fff" />
    </Svg>
  );
};

const EditIcon = ({ ...props }) => {
  const { fillColor = '#FFF' } = props;
  //const fillColor = colorScheme === 'dark' ? ThemeColors.WHITE : ThemeColors.BLACK;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22.867"
      height="22.866"
      viewBox="0 0 22.867 22.866">
      <G id="Group_5185" data-name="Group 5185" transform="translate(0 -0.501)">
        <Path
          id="Path_222"
          data-name="Path 222"
          d="M18.1,93.438a.952.952,0,0,0-.953.953v7.622a.954.954,0,0,1-.953.953H2.858a.954.954,0,0,1-.953-.953V88.674a.954.954,0,0,1,.953-.953h7.622a.953.953,0,0,0,0-1.906H2.858A2.862,2.862,0,0,0,0,88.674v13.339a2.862,2.862,0,0,0,2.858,2.858H16.2a2.862,2.862,0,0,0,2.858-2.858V94.391a.952.952,0,0,0-.953-.953Zm0,0"
          transform="translate(0 -81.505)"
          fill={fillColor}
        />
        <Path
          id="Path_223"
          data-name="Path 223"
          d="M182.622,75.8a.482.482,0,0,0-.131.243l-.674,3.369a.476.476,0,0,0,.468.57.453.453,0,0,0,.093-.009l3.368-.674a.474.474,0,0,0,.244-.131l7.538-7.538-3.368-3.368Zm0,0"
          transform="translate(-173.689 -64.735)"
          fill={fillColor}
        />
        <Path
          id="Path_224"
          data-name="Path 224"
          d="M396.132,1.2a2.384,2.384,0,0,0-3.368,0l-1.319,1.319,3.368,3.368,1.319-1.319a2.382,2.382,0,0,0,0-3.368Zm0,0"
          transform="translate(-373.963)"
          fill={fillColor}
        />
      </G>
    </Svg>
  );
};


export {
  AddCircleIcon,
  RightArrowIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  EditIcon
};
