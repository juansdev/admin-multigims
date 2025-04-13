import React from 'react';
import {cn} from '@/lib/utils';

interface RoleTagProps {
    label: string;
    color: string;
}

const RoleTag: React.FC<RoleTagProps> = ({label, color}) => {
    return (
        <div className="flex items-center rounded-full px-3 py-1 bg-[#292841] text-white text-sm">
      <span
          className={cn("h-3 w-3 rounded-full mr-2")}
          style={{backgroundColor: color}}
      ></span>
            {label}
        </div>
    );
};

export default RoleTag;