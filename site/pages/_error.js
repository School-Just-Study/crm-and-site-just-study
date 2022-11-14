import NextErrorComponent from 'next/error';
import Custom505Page from './500';

const CustomErrorComponent = (props) => {
    return <Custom505Page statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
    return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
