import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import CypressHomeIcon from '../icons/cypressHomeIcon';
import CypressSettingsIcon from '../icons/cypressSettingsIcon';
import CypressTrashIcon from '../icons/cypressTrashIcon';
import PomodoroTimer from '../global/pomodoro-timer';
import Settings from '../settings/settings';
import Trash from '../trash/trash';
import Image from 'next/image';
import gear from "../icons/gear.png"
import time from "../icons/time.png"
import todo from "../icons/todo.png"
import workspace from "../icons/workspace.png"
import trash from "../icons/trashsvg.svg"
import  Kanban  from '../icons/kanban.png';
import  calender  from '../icons/calendar.png';
import  manage  from '../icons/manage.png';
import  chat  from '../icons/chat.png';
import white from "../icons/white.svg"
import vdo from "../icons/vdo.svg"



interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation: React.FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge('my-2', className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}`}
          >
             <Image src={workspace} alt="Planning Icon" width={24} height={24} />
            <span>My Workspace</span>
          </Link>
        </li>

        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}/kanban`}
          >
             <Image src={Kanban} alt="Planning Icon" width={24} height={24} />
            <span>Task Manager</span>
          </Link>
        </li>

        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}/TodoList`}
          >
            <Image src={todo} alt="Planning Icon" width={24} height={24} />
            <span>Add Todos</span>
          </Link>
        </li>
        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}/whiteboard`}
          >
            <Image src={white} alt="Planning Icon" width={24} height={24} />
            <span>Whiteboard</span>
          </Link>
        </li>
        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/videocall`}
          >
            <Image src={vdo} alt="Planning Icon" width={24} height={24} />
            <span>Videocall</span>
          </Link>
        </li>
        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/videocall`}
          >
            <Image src={chat} alt="Planning Icon" width={24} height={24} />
            <span>Chat</span>
          </Link>
        </li>
        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}/Taskmanager`}
          >
            <Image src={manage} alt="Planning Icon" width={24} height={24} />
            <span>Project Manager</span>
          </Link>
        </li>
        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}/calender`}
          >
            <Image src={calender} alt="Planning Icon" width={24} height={24} />
            <span>Calender</span>
          </Link>
        </li>


        <Settings>
          <li
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer
          "
          >
             <Image src={gear} alt="Planning Icon" width={24} height={24} />
            <span>Settings</span>
          </li>
        </Settings>
        <PomodoroTimer
        >
          <li
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer
          "
          >
             <Image src={time} alt="Planning Icon" width={24} height={24} />
            <span>Productivity Timer</span>
          </li>
        </PomodoroTimer>
      

      <Trash>
        <li
          className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
        >
           <Image src={trash} alt="Planning Icon" width={24} height={24} />
          <span>Trash</span>
        </li>
      </Trash>
    </ul>
    </nav >
  );
};

export default NativeNavigation;
