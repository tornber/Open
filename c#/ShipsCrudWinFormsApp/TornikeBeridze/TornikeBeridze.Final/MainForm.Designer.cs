namespace TornikeBeridze.Final
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            shipsListView = new ListView();
            model = new ColumnHeader();
            releaseYear = new ColumnHeader();
            speed = new ColumnHeader();
            weight = new ColumnHeader();
            addBtn = new Button();
            removeBtn = new Button();
            SuspendLayout();
            // 
            // shipsListView
            // 
            shipsListView.BackColor = SystemColors.Info;
            shipsListView.Columns.AddRange(new ColumnHeader[] { model, releaseYear, speed, weight });
            shipsListView.FullRowSelect = true;
            shipsListView.Location = new Point(28, 37);
            shipsListView.Name = "shipsListView";
            shipsListView.Size = new Size(615, 382);
            shipsListView.TabIndex = 0;
            shipsListView.UseCompatibleStateImageBehavior = false;
            shipsListView.View = View.Details;
            // 
            // model
            // 
            model.Text = "Model";
            model.Width = 100;
            // 
            // releaseYear
            // 
            releaseYear.Text = "Release Year";
            releaseYear.Width = 100;
            // 
            // speed
            // 
            speed.Text = "Speed";
            speed.Width = 100;
            // 
            // weight
            // 
            weight.Text = "Weight";
            weight.Width = 100;
            // 
            // addBtn
            // 
            addBtn.ForeColor = SystemColors.ActiveCaptionText;
            addBtn.Location = new Point(670, 37);
            addBtn.Name = "addBtn";
            addBtn.Size = new Size(109, 41);
            addBtn.TabIndex = 1;
            addBtn.Text = "Add";
            addBtn.UseVisualStyleBackColor = true;
            addBtn.Click += addBtn_Click;
            // 
            // removeBtn
            // 
            removeBtn.Location = new Point(670, 109);
            removeBtn.Name = "removeBtn";
            removeBtn.Size = new Size(109, 37);
            removeBtn.TabIndex = 2;
            removeBtn.Text = "Remove";
            removeBtn.UseVisualStyleBackColor = true;
            removeBtn.Click += removeBtn_Click;
            // 
            // MainForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(removeBtn);
            Controls.Add(addBtn);
            Controls.Add(shipsListView);
            Name = "MainForm";
            Text = "Ships Form ";
            ResumeLayout(false);
        }

        #endregion

        private ListView shipsListView;
        private ColumnHeader model;
        private ColumnHeader releaseYear;
        private ColumnHeader speed;
        private ColumnHeader weight;
        private Button addBtn;
        private Button removeBtn;
    }
}
