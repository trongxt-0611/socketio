import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Button, Text } from "@chakra-ui/react";
import { getSender } from "../config/ChatLogics";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"Work sans"}
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          ></Text>
          <Button>Back</Button>
          {!selectedChat.isGroupChat ? (
            <>{getSender(user, selectedChat.users)} </>
          ) : (
            <>
              {selectedChat.chatName.toUpperCase() + "-group"}
              {
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              }
            </>
          )}
        </>
      ) : (
        <>lez go </>
      )}
    </>
  );
};

export default SingleChat;
