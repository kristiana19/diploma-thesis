"use client";

import Editor, {
  type BeforeMount,
} from "@monaco-editor/react";
import {
  AlertCircleIcon,
  BookOpenIcon,
  Code2Icon,
  LightbulbIcon,
} from "lucide-react";
import { useState } from "react";

import { CODING_QUESTIONS, LANGUAGES } from "@/constants";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import {
  ScrollArea,
  ScrollBar,
} from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Language = "javascript" | "python" | "java";

function CodeEditor() {
  const initialLanguage = LANGUAGES[0].id as Language;

  const [selectedQuestion, setSelectedQuestion] = useState(
    CODING_QUESTIONS[0],
  );

  const [language, setLanguage] =
    useState<Language>(initialLanguage);

  const [code, setCode] = useState(
    CODING_QUESTIONS[0].starterCode[initialLanguage],
  );

  const selectedLanguage = LANGUAGES.find(
    (item) => item.id === language,
  );

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find(
      (item) => item.id === questionId,
    );

    if (!question) return;

    setSelectedQuestion(question);
    setCode(question.starterCode[language]);
  };

  const handleLanguageChange = (value: string) => {
    const newLanguage = value as Language;

    setLanguage(newLanguage);
    setCode(selectedQuestion.starterCode[newLanguage]);
  };

  const getFileExtension = () => {
    switch (language) {
      case "javascript":
        return "js";

      case "python":
        return "py";

      case "java":
        return "java";

      default:
        return "txt";
    }
  };

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme("codeinterview-light", {
      base: "vs",
      inherit: true,

      rules: [
        {
          token: "comment",
          foreground: "9A7187",
          fontStyle: "italic",
        },
        {
          token: "keyword",
          foreground: "DB2777",
          fontStyle: "bold",
        },
        {
          token: "string",
          foreground: "B45309",
        },
        {
          token: "number",
          foreground: "7C3AED",
        },
        {
          token: "type",
          foreground: "BE185D",
        },
        {
          token: "type.identifier",
          foreground: "BE185D",
        },
        {
          token: "function",
          foreground: "C026D3",
        },
        {
          token: "variable",
          foreground: "6B3F57",
        },
        {
          token: "identifier",
          foreground: "6B3F57",
        },
        {
          token: "delimiter",
          foreground: "A8557A",
        },
        {
          token: "operator",
          foreground: "DB2777",
        },
      ],

      colors: {
        "editor.background": "#FFF9FC",
        "editor.foreground": "#5F4052",

        "editorGutter.background": "#FFF9FC",

        "editorLineNumber.foreground": "#C9A4B7",
        "editorLineNumber.activeForeground": "#DB2777",

        "editorCursor.foreground": "#EC4899",

        "editor.lineHighlightBackground": "#FDF0F6",
        "editor.lineHighlightBorder": "#00000000",

        "editor.selectionBackground": "#F9A8D466",
        "editor.inactiveSelectionBackground": "#FBCFE84D",
        "editor.selectionHighlightBackground": "#F9A8D433",

        "editorIndentGuide.background1": "#F3D5E3",
        "editorIndentGuide.activeBackground1": "#EC4899",

        "editorBracketHighlight.foreground1": "#DB2777",
        "editorBracketHighlight.foreground2": "#7C3AED",
        "editorBracketHighlight.foreground3": "#D97706",
        "editorBracketHighlight.foreground4": "#0891B2",
        "editorBracketHighlight.foreground5": "#BE185D",
        "editorBracketHighlight.foreground6": "#65A30D",

        "editorWhitespace.foreground": "#E8C7D7",

        "editorWidget.background": "#FFFFFF",
        "editorWidget.border": "#F3C4D9",

        "editorSuggestWidget.background": "#FFFFFF",
        "editorSuggestWidget.border": "#F3C4D9",
        "editorSuggestWidget.foreground": "#5F4052",
        "editorSuggestWidget.selectedBackground": "#FCE7F3",
        "editorSuggestWidget.highlightForeground": "#DB2777",

        "editorHoverWidget.background": "#FFFFFF",
        "editorHoverWidget.border": "#F3C4D9",

        "input.background": "#FFFFFF",
        "input.border": "#F3C4D9",
        "input.foreground": "#5F4052",

        "focusBorder": "#F472B6",

        "scrollbarSlider.background": "#E9A9C755",
        "scrollbarSlider.hoverBackground": "#DB7DA877",
        "scrollbarSlider.activeBackground": "#C95F9188",
      },
    });
  };

  return (
    <div className="h-full min-h-0 w-full overflow-hidden">
      <ResizablePanelGroup
        orientation="vertical"
        className="h-full min-h-0 w-full"
      >
        {/* PROBLEM PANEL */}
        <ResizablePanel
          defaultSize="42%"
          minSize="25%"
          maxSize="65%"
          className="min-h-0 overflow-hidden"
        >
          <div className="flex h-full min-h-0 flex-col bg-white/50 dark:bg-pink-950/10">
            {/* PROBLEM HEADER */}
            <div className="shrink-0 border-b border-pink-200/60 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-pink-300/15 dark:bg-pink-950/30">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-pink-200/70 bg-pink-100/70 text-pink-600 dark:border-pink-300/20 dark:bg-pink-400/10 dark:text-pink-300">
                    <Code2Icon className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold tracking-tight text-foreground">
                      {selectedQuestion.title}
                    </h2>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Read the task and write your solution
                    </p>
                  </div>
                </div>

                {/* SELECTORS */}
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <Select
                    value={selectedQuestion.id}
                    onValueChange={handleQuestionChange}
                  >
                    <SelectTrigger className="h-9 min-w-0 flex-1 rounded-xl border-pink-200/70 bg-white/80 text-xs shadow-none transition-colors hover:bg-pink-50 focus:ring-pink-300 sm:w-[175px] sm:flex-none dark:border-pink-300/20 dark:bg-pink-950/30">
                      <SelectValue placeholder="Select problem" />
                    </SelectTrigger>

                    <SelectContent className="rounded-xl border-pink-200/70 bg-white/95 shadow-xl shadow-pink-500/10 backdrop-blur-xl dark:border-pink-300/20 dark:bg-pink-950/95">
                      {CODING_QUESTIONS.map((question) => (
                        <SelectItem
                          key={question.id}
                          value={question.id}
                          className="cursor-pointer rounded-lg text-xs focus:bg-pink-50 focus:text-pink-700 dark:focus:bg-pink-400/10 dark:focus:text-pink-200"
                        >
                          {question.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={language}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="h-9 min-w-0 flex-1 rounded-xl border-pink-200/70 bg-white/80 text-xs shadow-none transition-colors hover:bg-pink-50 focus:ring-pink-300 sm:w-[140px] sm:flex-none dark:border-pink-300/20 dark:bg-pink-950/30">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <img
                            src={`/${language}.png`}
                            alt=""
                            className="size-4 object-contain"
                          />

                          <span>
                            {selectedLanguage?.name}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="rounded-xl border-pink-200/70 bg-white/95 shadow-xl shadow-pink-500/10 backdrop-blur-xl dark:border-pink-300/20 dark:bg-pink-950/95">
                      {LANGUAGES.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="cursor-pointer rounded-lg text-xs focus:bg-pink-50 focus:text-pink-700 dark:focus:bg-pink-400/10 dark:focus:text-pink-200"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={`/${item.id}.png`}
                              alt=""
                              className="size-4 object-contain"
                            />

                            <span>{item.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* PROBLEM CONTENT */}
            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-3 p-4">
                {/* DESCRIPTION */}
                <section className="overflow-hidden rounded-2xl border border-pink-200/60 bg-white/65 shadow-sm shadow-pink-500/5 dark:border-pink-300/15 dark:bg-pink-950/20">
                  <div className="flex items-center gap-2 border-b border-pink-200/50 px-4 py-3 dark:border-pink-300/10">
                    <BookOpenIcon className="size-4 text-pink-500 dark:text-pink-300" />

                    <h3 className="text-sm font-medium text-foreground">
                      Problem description
                    </h3>
                  </div>

                  <div className="px-4 py-3">
                    <p className="whitespace-pre-line text-sm leading-6 text-foreground/80">
                      {selectedQuestion.description}
                    </p>
                  </div>
                </section>

                {/* EXAMPLES */}
                <section className="overflow-hidden rounded-2xl border border-pink-200/60 bg-white/65 shadow-sm shadow-pink-500/5 dark:border-pink-300/15 dark:bg-pink-950/20">
                  <div className="flex items-center gap-2 border-b border-pink-200/50 px-4 py-3 dark:border-pink-300/10">
                    <LightbulbIcon className="size-4 text-amber-500" />

                    <h3 className="text-sm font-medium text-foreground">
                      Examples
                    </h3>
                  </div>

                  <div className="space-y-3 p-4">
                    {selectedQuestion.examples.map(
                      (example, index) => (
                        <div
                          key={index}
                          className="overflow-hidden rounded-xl border border-pink-100/80 bg-pink-50/45 dark:border-pink-300/10 dark:bg-pink-400/5"
                        >
                          <div className="border-b border-pink-100/80 px-3 py-2 dark:border-pink-300/10">
                            <span className="text-xs font-medium text-pink-700 dark:text-pink-200">
                              Example {index + 1}
                            </span>
                          </div>

                          <ScrollArea className="w-full">
                            <pre className="min-w-max p-3 font-mono text-xs leading-5 text-foreground/80">
                              <code>
                                <span className="text-pink-500 dark:text-pink-300">
                                  Input:
                                </span>{" "}
                                {example.input}
                                {"\n"}

                                <span className="text-pink-500 dark:text-pink-300">
                                  Output:
                                </span>{" "}
                                {example.output}

                                {example.explanation && (
                                  <>
                                    {"\n"}
                                    <span className="text-muted-foreground">
                                      Explanation:
                                    </span>{" "}
                                    {
                                      example.explanation
                                    }
                                  </>
                                )}
                              </code>
                            </pre>

                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      ),
                    )}
                  </div>
                </section>

                {/* CONSTRAINTS */}
                {selectedQuestion.constraints &&
                  selectedQuestion.constraints.length >
                    0 && (
                    <section className="overflow-hidden rounded-2xl border border-pink-200/60 bg-white/65 shadow-sm shadow-pink-500/5 dark:border-pink-300/15 dark:bg-pink-950/20">
                      <div className="flex items-center gap-2 border-b border-pink-200/50 px-4 py-3 dark:border-pink-300/10">
                        <AlertCircleIcon className="size-4 text-blue-500" />

                        <h3 className="text-sm font-medium text-foreground">
                          Constraints
                        </h3>
                      </div>

                      <div className="px-4 py-3">
                        <ul className="space-y-2">
                          {selectedQuestion.constraints.map(
                            (constraint, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm leading-5 text-muted-foreground"
                              >
                                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-pink-400" />

                                <span>
                                  {constraint}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </section>
                  )}
              </div>

              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </ResizablePanel>

        {/* VERTICAL RESIZE HANDLE */}
        <ResizableHandle
          withHandle
          className="h-2 border-y border-pink-200/50 bg-pink-50/80 transition-colors hover:bg-pink-100 dark:border-pink-300/10 dark:bg-pink-950/40 dark:hover:bg-pink-900/40"
        />

        {/* EDITOR PANEL */}
        <ResizablePanel
          defaultSize="58%"
          minSize="35%"
          className="min-h-0 overflow-hidden"
        >
          <div className="flex h-full min-h-0 w-full flex-col bg-[#fff9fc]">
            {/* EDITOR HEADER */}
            <div className="flex h-10 shrink-0 items-center justify-between border-b border-pink-200/60 bg-white/80 px-3 backdrop-blur-xl">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-pink-200/60 bg-pink-50">
                  <img
                    src={`/${language}.png`}
                    alt=""
                    className="size-4 object-contain"
                  />
                </div>

                <span className="truncate font-mono text-xs text-pink-950/75">
                  solution.{getFileExtension()}
                </span>
              </div>

              <span className="text-[11px] text-pink-950/45">
                {selectedLanguage?.name}
              </span>
            </div>

            {/* MONACO EDITOR */}
            <div className="min-h-0 flex-1">
              <Editor
                height="100%"
                width="100%"
                language={language}
                theme="codeinterview-light"
                beforeMount={handleEditorWillMount}
                value={code}
                onChange={(value) =>
                  setCode(value ?? "")
                }
                options={{
                  automaticLayout: true,

                  minimap: {
                    enabled: false,
                  },

                  fontFamily:
                    "JetBrains Mono, Fira Code, Consolas, monospace",
                  fontSize: 14,
                  lineHeight: 22,

                  lineNumbers: "on",
                  lineNumbersMinChars: 3,

                  scrollBeyondLastLine: false,
                  smoothScrolling: true,

                  cursorSmoothCaretAnimation: "on",
                  cursorBlinking: "smooth",

                  padding: {
                    top: 14,
                    bottom: 14,
                  },

                  wordWrap: "on",
                  wrappingIndent: "indent",

                  tabSize: 2,
                  insertSpaces: true,

                  renderLineHighlight: "line",
                  roundedSelection: true,

                  overviewRulerBorder: false,
                  hideCursorInOverviewRuler: true,

                  folding: true,

                  bracketPairColorization: {
                    enabled: true,
                  },

                  guides: {
                    bracketPairs: true,
                    indentation: true,
                  },

                  scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                  },
                }}
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default CodeEditor;