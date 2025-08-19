import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateInputProps {
  id?: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onDateChange?: (date: Date | undefined) => void
  disabled?: boolean
  required?: boolean
  className?: string
  error?: string
  minDate?: Date
  maxDate?: Date
  format?: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd" | "long"
}

function formatDate(date: Date | undefined, format: string = "dd/MM/yyyy") {
  if (!date) {
    return ""
  }

  switch (format) {
    case "dd/MM/yyyy":
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    case "MM/dd/yyyy":
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    case "yyyy-MM-dd":
      return date.toISOString().split('T')[0]
    case "long":
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    default:
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
  }
}

function parseDate(dateString: string): Date | undefined {
  if (!dateString) return undefined

  // Intentar diferentes formatos
  const formats = [
    /^\d{2}\/\d{2}\/\d{4}$/, // dd/MM/yyyy
    /^\d{2}-\d{2}-\d{4}$/,   // dd-MM-yyyy
    /^\d{4}-\d{2}-\d{2}$/,   // yyyy-MM-dd
    /^\d{1,2}\/\d{1,2}\/\d{4}$/, // d/M/yyyy
  ]

  for (const format of formats) {
    if (format.test(dateString)) {
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        return date
      }
    }
  }

  return undefined
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export function DateInput({
  id,
  label,
  placeholder = "Selecciona una fecha",
  value = "",
  onChange,
  onDateChange,
  disabled = false,
  required = false,
  className,
  error,
  minDate,
  maxDate,
  format = "dd/MM/yyyy"
}: DateInputProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    value ? parseDate(value) : undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [inputValue, setInputValue] = React.useState(value || formatDate(date, format))

  // Actualizar cuando cambie el value externo
  React.useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value)
      const parsedDate = parseDate(value)
      setDate(parsedDate)
      setMonth(parsedDate)
    }
  }, [value, format])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setMonth(selectedDate)

    const formattedValue = formatDate(selectedDate, format)
    setInputValue(formattedValue)

    if (onChange) {
      onChange(formattedValue)
    }

    if (onDateChange) {
      onDateChange(selectedDate)
    }

    setOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (onChange) {
      onChange(newValue)
    }

    const parsedDate = parseDate(newValue)
    if (isValidDate(parsedDate)) {
      setDate(parsedDate)
      setMonth(parsedDate)
      if (onDateChange) {
        onDateChange(parsedDate)
      }
    }
  }

  const handleInputBlur = () => {
    // Validar y formatear al perder el foco
    const parsedDate = parseDate(inputValue)
    if (isValidDate(parsedDate)) {
      const formattedValue = formatDate(parsedDate, format)
      setInputValue(formattedValue)
      if (onChange) {
        onChange(formattedValue)
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          id={id}
          value={inputValue}
          placeholder={placeholder}
          className={cn(
            "bg-background pr-10",
            error && "border-red-500 focus:border-red-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
            if (e.key === "Enter") {
              e.preventDefault()
              setOpen(true)
            }
          }}
          disabled={disabled}
          required={required}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={cn(
                "absolute top-1/2 right-2 size-6 -translate-y-1/2 p-0",
                disabled && "cursor-not-allowed"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Seleccionar fecha</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
              disabled={(date) => {
                if (minDate && date < minDate) return true
                if (maxDate && date > maxDate) return true
                return false
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  )
}

// Componente específico para el formulario de entidades
export function EntityDateInput({
  id,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  error
}: {
  id: string
  label: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  error?: string
}) {
  return (
    <DateInput
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      error={error}
      format="yyyy-MM-dd"
      placeholder="Selecciona una fecha"
    />
  )
}

// Componente simple para usar en formularios con react-hook-form
export function DateInputField({
  id,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  error,
  className
}: {
  id: string
  label: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  error?: string
  className?: string
}) {
  return (
    <div className={cn("w-full", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type="date"
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        className={cn(
          "mt-1",
          error && "border-red-500 focus:border-red-500"
        )}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  )
}
