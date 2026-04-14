// app/test/page.tsx

import UserForm from "@/utils/components/UserForm";
import UserList from "@/utils/components/UserList";
import UserDetail from "@/utils/components/UserDetail";
import SentenceForm from "@/utils/components/SentenceForm";
import SentenceList from "@/utils/components/SentenceList";
import PracticeForm from "@/utils/components/PracticeForm";

export default function TestPage() {
    return (
        <div className="pb-24">
            <h1>사용자 정보 입력</h1>
            <UserForm />
            <hr />
            <UserList />
            <hr />
            <UserDetail />
            <hr />
            <PracticeForm />
            <hr />
            <h1>문장 입력</h1>
            <div className="max-h-64 overflow-y-auto">
                <SentenceForm />
            </div>
            <hr />
            <SentenceList />

        </div>
    )
}
