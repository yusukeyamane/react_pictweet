json.data(@comments) { |d| json.extract!(d, :text, :user) }
