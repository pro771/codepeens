import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Save, Download } from "lucide-react";

interface StatusBarProps {
  htmlLength: number;
  cssLength: number;
  jsLength: number;
  autoUpdate: boolean;
  onAutoUpdateChange: (value: boolean) => void;
  errors: string[];
  onClearErrors: () => void;
  onSave: () => void;
  onExport: () => void;
}

const StatusBar = ({
  htmlLength,
  cssLength,
  jsLength,
  autoUpdate,
  onAutoUpdateChange,
  errors,
  onClearErrors,
  onSave,
  onExport
}: StatusBarProps) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
  
  const hasErrors = errors.length > 0;
  
  return (
    <div>
      {/* Display errors if any */}
      {hasErrors && (
        <div className="bg-red-900/50 border-t border-red-800 text-white p-2">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium mb-1">Errors detected:</div>
              <ul className="text-sm list-disc pl-5">
                {errors.slice(0, 3).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
                {errors.length > 3 && (
                  <li>...and {errors.length - 3} more errors</li>
                )}
              </ul>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearErrors}
              className="text-white hover:bg-red-800/50"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
      
      {/* Main status bar */}
      <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs py-2 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full ${hasErrors ? 'bg-red-500' : 'bg-emerald-500'} mr-2`}></span>
            <span>{hasErrors ? `${errors.length} error${errors.length > 1 ? 's' : ''}` : 'No errors'}</span>
          </div>
          <div>
            <span>Line: {cursorPosition.line}, Col: {cursorPosition.col}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSave}
              className="h-7 px-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <Save className="h-3.5 w-3.5 mr-1" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              className="h-7 px-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Export
            </Button>
          </div>
          
          <div className="border-l border-zinc-800 h-4"></div>
          
          <div>
            <span>HTML: {htmlLength} lines</span>
          </div>
          <div>
            <span>CSS: {cssLength} lines</span>
          </div>
          <div>
            <span>JS: {jsLength} lines</span>
          </div>
          
          <div className="border-l border-zinc-800 h-4"></div>
          
          <div className="flex items-center">
            <span className="mr-2">Auto-update:</span>
            <Switch
              checked={autoUpdate}
              onCheckedChange={onAutoUpdateChange}
              className="data-[state=checked]:bg-indigo-600"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StatusBar;
