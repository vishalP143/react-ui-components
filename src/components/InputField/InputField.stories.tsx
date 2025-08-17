import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FilledVariant: Story = {
  args: {
    variant: "filled",
  },
};

export const GhostVariant: Story = {
  args: {
    variant: "ghost",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
    placeholder: "Type something...",
  },
};

export const PasswordToggle: Story = {
  args: {
    type: "password",
    passwordToggle: true,
    placeholder: "Enter your password",
  },
};

export const DarkMode: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "This is a helper text",
  },
  decorators: [
    (Story) => (
      <div className="dark bg-gray-900 p-4 min-h-screen text-white">
        <Story />
      </div>
    ),
  ],
};
