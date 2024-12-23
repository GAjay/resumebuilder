export interface ResumeSection {
  id: string;
  type: string;
  title: string;
  content: any[];
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface Resume {
  sections: ResumeSection[];
  theme: Theme;
}