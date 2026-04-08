import { SECTOR_OPTIONS_BY_GROUP } from "@/constants/business-sector";

export const BUSINESS_SECTOR_OPTIONS = SECTOR_OPTIONS_BY_GROUP.map((group) => ({
  label: group.group,
  options: group.options.map(({ value, label, Icon }) => ({
    value,
    label: (
      <span className="flex items-center gap-2">
        <Icon size={18} />
        {label}
      </span>
    ),
  })),
}));
