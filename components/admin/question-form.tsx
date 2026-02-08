"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Option {
  label: string;
  styles: string;
}

interface QuestionFormProps {
  initialData?: any;
}

const RELATIONSHIP_TYPES = ["Romantic partner", "Friend", "Family member", "Myself"];
const LOVE_STYLES = [
  "Soft & Sentimental",
  "Thoughtful & Practical",
  "Comfort & Care",
  "Stylish & Aesthetic",
  "Experiential & Immersive",
];

export function QuestionForm({ initialData }: QuestionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    question: initialData?.question || "",
    section: initialData?.section || "About Them",
    order: initialData?.order || 1,
    type: initialData?.type || "choice",
    isRequired: initialData?.isRequired || false,
    maxSelect: initialData?.maxSelect || 1,
    contextHint: initialData?.contextHint ? JSON.parse(initialData.contextHint) : {
      "Romantic partner": "",
      "Friend": "",
      "Family member": "",
      "Myself": "",
    },
    options: initialData?.options || [],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = "/api/admin/quiz";
      const method = initialData ? "PUT" : "POST";
      const body = initialData ? { ...formData, id: initialData.id } : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        router.push("/admin/quiz");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save question");
    } finally {
      setLoading(false);
    }
  }

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, { label: "", styles: "" }],
    });
  };

  const removeOption = (index: number) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_: any, i: number) => i !== index),
    });
  };

  const updateOption = (index: number, field: string, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData({ ...formData, options: newOptions });
  };

  const handleContextChange = (type: string, value: string) => {
    setFormData({
      ...formData,
      contextHint: { ...formData.contextHint, [type]: value },
    });
  };

  const toggleStyle = (optionIndex: number, style: string) => {
    const option = formData.options[optionIndex];
    const currentStyles = option.styles ? option.styles.split(",").filter(Boolean) : [];
    
    let newStyles;
    if (currentStyles.includes(style)) {
      newStyles = currentStyles.filter((s: string) => s !== style);
    } else {
      newStyles = [...currentStyles, style];
    }
    
    updateOption(optionIndex, "styles", newStyles.join(","));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question Text</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="e.g. What kind of gestures make {name} happiest?"
                required
              />
              <p className="text-xs text-muted-foreground">Use {"{name}"} as a placeholder for the recipient's name.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select 
                  value={formData.section} 
                  onValueChange={(v) => setFormData({ ...formData, section: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="About Them">About Them</SelectItem>
                    <SelectItem value="How They Experience Gifts">How They Experience Gifts</SelectItem>
                    <SelectItem value="You">You</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Response Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="choice">Multiple Choice</SelectItem>
                    <SelectItem value="freetext">Free Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSelect">Max Selections</Label>
                <Input
                  id="maxSelect"
                  type="number"
                  value={formData.maxSelect}
                  onChange={(e) => setFormData({ ...formData, maxSelect: parseInt(e.target.value) })}
                  disabled={formData.type === "freetext"}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="isRequired"
                checked={formData.isRequired}
                onCheckedChange={(checked) => setFormData({ ...formData, isRequired: checked })}
              />
              <Label htmlFor="isRequired">Required Question</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Context Hints (Relationship-specific)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {RELATIONSHIP_TYPES.map((type) => (
              <div key={type} className="space-y-2">
                <Label className="text-xs font-bold uppercase">{type}</Label>
                <Textarea
                  value={formData.contextHint[type]}
                  onChange={(e) => handleContextChange(type, e.target.value)}
                  placeholder={`Hint for ${type}...`}
                  className="h-20"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {formData.type === "choice" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Options & Love Styles</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addOption} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Option
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.options.length === 0 && (
              <p className="text-center py-8 text-muted-foreground italic">No options added yet. Click "Add Option" to begin.</p>
            )}
            {formData.options.map((option: any, index: number) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/20 space-y-4 relative group">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeOption(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>

                <div className="space-y-2">
                  <Label>Option Label</Label>
                  <Input
                    value={option.label}
                    onChange={(e) => updateOption(index, "label", e.target.value)}
                    placeholder="e.g. Something emotional or personal"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Associated Love Styles (Select all that apply)</Label>
                  <div className="flex flex-wrap gap-2">
                    {LOVE_STYLES.map((style) => {
                      const isSelected = option.styles.split(",").includes(style);
                      return (
                        <Badge
                          key={style}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer py-1 px-3"
                          onClick={() => toggleStyle(index, style)}
                        >
                          {style}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="gap-2"
          disabled={loading}
        >
          {loading ? "Saving..." : <><Save className="h-4 w-4" /> Save Question</>}
        </Button>
      </div>
    </form>
  );
}
