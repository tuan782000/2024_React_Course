import { createElement } from "react";

const UserFavoriteFood = () => {
    return createElement('section', null,
        <div>
            <span>Favorites Foods:</span>
            <br />
            <ul>
                <li>Shushi</li>
                <li>Pizza</li>
                <li>Hotdog</li>
            </ul>
        </div>
    )
}

export default UserFavoriteFood

/*
createElement nhận ba đối số:
Loại phần tử bạn muốn tạo, trong trường hợp này là 'section'.
Các thuộc tính của phần tử (props), ở đây là null (không có props).
Các con (children) của phần tử từ đó trở về sau, ở đây là một phần tử span, br, ul>li khác được viết bằng JSX.


createElement<React.HTMLAttributes<HTMLElement>, HTMLElement>(type: keyof ReactHTML, props?: (React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>) | null | undefined, ...children: ReactNode[])

tham số đầu là thẻ - tham số thứ 2 là props nếu không có để null, từ tham số thứ 3 trở đi là children

kiểu dữ liệu của đánh này sẽ là ReactNode
*/

