import {Helmet} from "react-helmet";

const BreadCrumb = (props) => {
    return (
        <>
            <Helmet>
                <title>{props.title} | Joyanta BD</title>
            </Helmet>
            <ol className="breadcrumb my-4">
                <li className="breadcrumb-item text-danger">Dashboard</li>
                <li className="breadcrumb-item active">{props.title}</li>
            </ol>
        </>
    );
}

export default BreadCrumb;