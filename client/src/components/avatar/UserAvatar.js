import { Avatar } from "@mui/material";

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name) {
    let nameUser;
    if (name.split(" ").length > 1) {
        nameUser = name.split(" ")[0][0] + name.split(" ")[1][0];
    } else {
        nameUser = name[0] + name[1];
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: nameUser,
    };
}

export default function UserAvatar({ width, height, name, fontSize }) {
    const userInfo = { ...stringAvatar(name) };
    return (
        <Avatar
            sx={{
                width: width,
                height: height,
                backgroundColor: userInfo.sx.bgcolor,
                fontSize: fontSize,
            }}>
            {userInfo.children.toUpperCase()}
        </Avatar>
    );
}
