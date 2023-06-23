import CreateMemberForm from "./CreateMemberForm";
import LoginMemberForm from "./LoginMemberForm";
import {useContext} from "react";
import AppContext from "./context";
import AdminBorrowingForm from "./AdminBorrowingForm";
import {useNavigate} from "react-router-dom";

const Home = ({ getBooks, getMembers }) => {

    const {client, token, members, books} = useContext(AppContext);

    if (!token) {
        return (
            <>
                <LoginMemberForm/>
                <CreateMemberForm/>
            </>
        )
    }
    return (
        <AdminBorrowingForm getBooks={getBooks} getMembers={getMembers} members={members} books={books}/>
    )
}

export default Home;