import { Loader2, X, ChevronDown, Check } from 'lucide-react'
import { useState, useEffect, MouseEvent, useMemo } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

interface IOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface IMultiSelect {
  options: IOption[] | (() => Promise<IOption[]>);
  onChange: (selected: string[]) => void;
  placeholder: string;
  isLoading?: boolean;
  preselected?: string[];
}

const MultiSelect = ({ options, placeholder, isLoading = false, preselected = [], onChange }: IMultiSelect) => {
  const [selected, setSelected] = useState<string[]>(preselected);
  const [asyncOptions, setAsyncOptions] = useState<IOption[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(isLoading);

  const resolvedOptions = useMemo(() => {
    if (typeof options === 'function') {
      return async () => {
        setLoading(true);
        try {
          const data = await options();
          setAsyncOptions(data);
        } catch (error) {
          console.error('Failed to load options:', error);
          setAsyncOptions([]);
        } finally {
          setLoading(false);
        }
      };
    } else {
      setAsyncOptions(options);
      return null;
    }
  }, [options]);


  useEffect(() => {
    if (resolvedOptions) {
      resolvedOptions();
    }
  }, [resolvedOptions]);


  const handleSelect = (value: string) => {
    const option = asyncOptions.find((opt) => opt.value === value);
    if (option?.disabled) return;

    setSelected((prevState) => {
      const newSelected = prevState.includes(value)
        ? prevState.filter((v) => v !== value)
        : [...prevState, value];
      onChange(newSelected);
      return newSelected;
    });
  };

  const handleClear = () => {
    setSelected([]);
    onChange([]);
  };

  const handleRemove = (value: string, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelected((prev) => {
      const newSelected = prev.filter((v) => v !== value);
      onChange(newSelected);
      return newSelected;
    });
  };

  return (
    <div className='space-y-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className='relative w-full border rounded-md p-2 cursor-pointer flex flex-wrap items-center gap-2 min-h-[40px]'>
            {selected.length > 0 ? (
              selected.map((s) => {
                const option = asyncOptions.find((opt) => opt.value === s);
                return (
                  <Badge key={s} variant='secondary' className='flex items-center space-x-1 px-2 py-1 rounded-md'>
                    <span>{option?.label || s}</span>
                    <button onClick={(e) => handleRemove(s, e)} className='ml-1'>
                      <X size={14} />
                    </button>
                  </Badge>
                );
              })
            ) : (
              <span className='text-gray-500'>{loading ? 'Loading...' : placeholder}</span>
            )}
            <div className='ml-auto flex items-center'>
              {selected.length > 0 && (
                <button onClick={handleClear} className='text-gray-500 hover:text-gray-700'>
                  <X size={16} />
                </button>
              )}
              <ChevronDown className='ml-2 w-4 h-4 text-gray-500' />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-2 shadow-lg rounded-md bg-white'>
          {loading ? (
            <div className='flex items-center justify-center p-4'>
              <Loader2 className='animate-spin' />
            </div>
          ) : (
            <ScrollArea className='max-h-48 !w-full flex-1'>
              {asyncOptions.map((option) => (
                <div
                  key={option.value}
                  className={`w-full flex items-center space-x-2 p-2 cursor-pointer rounded-md ${option.disabled ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  onClick={() => handleSelect(option.value)}
                >
                  {selected.includes(option.value) ? <Check className='w-4 h-4' /> : <div className='w-4 h-4' />}
                  <span>{option.label}</span>
                </div>
              ))}
            </ScrollArea>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelect;
