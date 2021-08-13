// type

// components

// views
import React, { useState, useEffect } from 'react';
// import { RightContent } from './components/rightContent';
import { LeftContent } from './components/leftContent';
import { WrapperChatPage } from './views';
import { ContextChat, StateChatType, CorrespondenceType } from '@md-modules/shared/types/chat';
import { User } from './constants/users';
import { CenterContent } from './components/centerContent';

export const ChatContext = React.createContext<ContextChat>({
  filesDropzone: [],
  stateUser: [],
  inputValue: '',
  handleStateUser: () => {},
  correspondence: [],
  handleCorrespondence: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
  handleClickButtonReverse: () => {},
  handleFilesDropzone: () => {}
});

export const ChatPage = () => {
  const [filesDropzone, setFilesDropzone] = useState<any>([]);
  const [stateUser, setStateUser] = useState<StateChatType[]>(User);
  const [correspondence, setCorrespondence] = useState<CorrespondenceType[]>([]);
  const [inputValue, setInputValue] = useState('');

  const isActiveUser = stateUser.find((user) => user.isActive === true);
  const isActiveDialog = correspondence.find((dialog) => dialog.isActive === true);

  useEffect(() => {
    setCorrespondence(
      stateUser.map((user, index) => {
        const firstMessage = index === 1;
        return {
          id: `${index}c`,
          isActive: firstMessage,
          users: {
            firstId: '',
            secondId: user.id
          },
          message: [
            {
              id: user.id,
              message: 'no messages',
              messageImg: []
            }
          ]
        };
      })
    );
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setInputValue(value);
  };

  const handleCorrespondence = (id: string) => {
    const idIndexItemIsActive = isActiveDialog?.id;

    return setCorrespondence(
      correspondence.map((el) =>
        el.id === id ? { ...el, isActive: true } : el.id === idIndexItemIsActive ? { ...el, isActive: false } : el
      )
    );
  };

  const handleStateUser = (id: string) => {
    const idIndexItemIsActive = isActiveUser?.id;

    return setStateUser(
      stateUser.map((el) =>
        el.id === id ? { ...el, isActive: true } : el.id === idIndexItemIsActive ? { ...el, isActive: false } : el
      )
    );
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    const isActiveUserId = isActiveUser?.id;
    const isfirstId = isActiveDialog?.users.firstId.length;

    const firstId = isfirstId || 0 > 1 ? isActiveDialog?.users.firstId : isActiveUserId;

    const arrMessageImg = filesDropzone.map((el: { preview: string }) => el.preview) || [];

    setCorrespondence(
      correspondence.map((dialog) =>
        dialog.isActive === true
          ? {
              ...dialog,
              message: [
                ...dialog.message,
                { id: isActiveUserId || 'no Id', message: `${inputValue}`, messageImg: arrMessageImg }
              ],
              users: { ...dialog.users, firstId: firstId || 'no Id' }
            }
          : dialog
      )
    );
    setInputValue('');
    setFilesDropzone([]);
  };

  const handleClickButtonReverse = () => {
    setCorrespondence(
      correspondence.map((el) =>
        el.isActive === true
          ? { ...el, users: { ...el.users, firstId: el.users.secondId, secondId: el.users.firstId } }
          : el
      )
    );
    setStateUser((stateUser) => {
      return stateUser.map((user) =>
        user.isActive === true
          ? { ...user, isActive: false }
          : user.id === isActiveDialog?.users.firstId
          ? { ...user, isActive: true }
          : user
      );
    });
  };

  const handleFilesDropzone = <T extends File>(acceptedFiles: T[]) => {
    return setFilesDropzone(acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
  };
  return (
    <ChatContext.Provider
      value={{
        filesDropzone,
        stateUser,
        correspondence,
        inputValue,
        handleStateUser,
        handleCorrespondence,
        handleChange,
        handleSubmit,
        handleClickButtonReverse,
        handleFilesDropzone
      }}
    >
      <WrapperChatPage>
        <LeftContent />
        <CenterContent />
        {/* <RightContent /> */}
      </WrapperChatPage>
    </ChatContext.Provider>
  );
};